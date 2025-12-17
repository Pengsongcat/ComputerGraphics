import { dyno } from "@sparkjsdev/spark";

export function createPerlinWaveShader(splatMesh, params, animateT) {
  splatMesh.objectModifier = dyno.dynoBlock(
    { gsplat: dyno.Gsplat },
    { gsplat: dyno.Gsplat },
    ({ gsplat }) => {

      const d = new dyno.Dyno({
        inTypes: {
          gsplat: dyno.Gsplat,
          t: "float",
          intensity: "float",
          waveFrequency: "float",
          waveAmplitute: "float",
          waveSpeed: "float",
          scaleBlend: "float"
        },
        outTypes: { gsplat: dyno.Gsplat },

        globals: () => [dyno.unindent(`
          vec3 hash(vec3 p) {
            return fract(sin(p * 123.456) * 123.456);
          }

          vec3 noise(vec3 p) {
            vec3 i = floor(p);
            vec3 f = fract(p);
            f = f * f * (3.0 - 2.0 * f);

            vec3 n000 = hash(i + vec3(0,0,0));
            vec3 n100 = hash(i + vec3(1,0,0));
            vec3 n010 = hash(i + vec3(0,1,0));
            vec3 n110 = hash(i + vec3(1,1,0));
            vec3 n001 = hash(i + vec3(0,0,1));
            vec3 n101 = hash(i + vec3(1,0,1));
            vec3 n011 = hash(i + vec3(0,1,1));
            vec3 n111 = hash(i + vec3(1,1,1));

            vec3 x0 = mix(n000, n100, f.x);
            vec3 x1 = mix(n010, n110, f.x);
            vec3 x2 = mix(n001, n101, f.x);
            vec3 x3 = mix(n011, n111, f.x);

            vec3 y0 = mix(x0, x1, f.y);
            vec3 y1 = mix(x2, x3, f.y);

            return mix(y0, y1, f.z);
          }
        `)],

        statements: ({ inputs, outputs }) => dyno.unindentLines(`
          ${outputs.gsplat} = ${inputs.gsplat};

          vec3 pos    = ${inputs.gsplat}.center;
          vec3 scales = ${inputs.gsplat}.scales;
          float t     = ${inputs.t};

          vec3 offset =
            noise(pos * ${inputs.waveFrequency} + t * ${inputs.waveSpeed})
            * ${inputs.waveAmplitute}
            * ${inputs.intensity};

          ${outputs.gsplat}.center = pos + offset;

          float sb = max(${inputs.scaleBlend}, 0.05);
          ${outputs.gsplat}.scales = scales * sb;
        `),
      });

      gsplat = d.apply({
        gsplat,
        t: animateT,
        intensity: dyno.dynoFloat(params.intensity),
        waveFrequency: dyno.dynoFloat(params.waveFrequency),
        waveAmplitute: dyno.dynoFloat(params.waveAmplitute),
        waveSpeed: dyno.dynoFloat(params.waveSpeed),
        scaleBlend: dyno.dynoFloat(params.scaleBlend),
      }).gsplat;

      return { gsplat };
    }
  );

  splatMesh.updateGenerator();
}
