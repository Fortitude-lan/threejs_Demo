#define PI 3.1415926535897932384626433832795

varying vec2 vUv;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}
vec2 rotate(vec2 uv, float rotation, vec2 mid) {
    return vec2(cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x, cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y);
}

void main() {   
    //Pattern 3
    // float strengh = vUv.x;

    //Pattern 4
    // float strengh = vUv.y;

    //Pattern 5
    // float strengh = 1.0 - vUv.y;

    // Pattern 6
    // float strengh = vUv.y*10.0;

    // Pattern 7
    // float strengh = mod(vUv.y*10.0,1.0);

    // Pattern 8
    // float strengh = mod(vUv.y*10.0,1.0);
    // strengh = step(0.5,strengh);

    // Pattern 9
    // float strengh = mod(vUv.y*10.0,1.0);
    // strengh = step(0.8,strengh);

    // Pattern 10
    // float strengh = mod(vUv.x*10.0,1.0);
    // strengh = step(0.8,strengh);

    // Pattern 11
    float strengh = step(0.8,mod(vUv.x*10.0,1.0));
          strengh += step(0.8,mod(vUv.y*10.0,1.0));

    // Pattern 12 
    // float strengh = step(0.8,mod(vUv.x*10.0,1.0));
    //       strengh *= step(0.8,mod(vUv.y*10.0,1.0));

    // Pattern 13
    // float strengh = step(0.2,mod(vUv.x * 10.0,1.0));
    //       strengh *= step(0.8,mod(vUv.y * 10.0,1.0));

    // Pattern 14
    // float barX = step(0.4,mod(vUv.x * 10.0,1.0));
    //       barX *= step(0.8,mod(vUv.y * 10.0,1.0));

    // float barY = step(0.8,mod(vUv.x * 10.0,1.0));
    //       barY *= step(0.4,mod(vUv.y * 10.0,1.0));
    // float strengh = barX+barY;

    // Pattern 15 +
    // float v = 0.4;
    // float barX = step(v,mod(vUv.x * 10.0,1.0));
    //       barX *= step(v*2.0,mod(vUv.y * 10.0 + v * 0.5,1.0));

    // float barY = step(v*2.0,mod(vUv.x * 10.0 + v * 0.5,1.0));
    //       barY *= step(v,mod(vUv.y * 10.0,1.0));
    // float strengh = barX+barY;

    // Pattern 16
    // float strengh = vUv.x - 0.5;

    // Pattern 17
    // float strengh =min( abs(vUv.x - 0.5) , abs(vUv.y - 0.5)) ;

    // Pattern 18
    // float strengh =max( abs(vUv.x - 0.5) , abs(vUv.y - 0.5)) ;

    // Pattern 19
    // float strengh =step(0.2,max( abs(vUv.x - 0.5) , abs(vUv.y - 0.5)) );

    // Pattern 20
    // float squarel1 =step(0.2,max( abs(vUv.x - 0.5) , abs(vUv.y - 0.5)) );
    // float squarel2 =1.0 - step(0.25,max( abs(vUv.x - 0.5) , abs(vUv.y - 0.5)) );
    // float strengh = squarel1 * squarel2;

    // Pattern 21
    // float strengh = floor(vUv.x*10.0) / 10.0;

    // Pattern 22
    // float strengh = floor(vUv.x*10.0) / 10.0;
    // strengh *= floor(vUv.y*10.0) / 10.0;

    // Pattern 23
    // float strengh = random(vUv) ;

    // Pattern 24
    // vec2 gridUv = vec2(
    //     floor(vUv.x*10.0) / 10.0, 
    //     floor(vUv.y*10.0) / 10.0
    //     );
    // float strengh = random(gridUv);

    // Pattern 25
    // vec2 gridUv = vec2(
    //     floor(vUv.x*10.0) / 10.0, 
    //     floor(vUv.y * 10.0 + vUv.x * 5.0 ) / 10.0 
    //     );
    // float strengh = random(gridUv);

    // Pattern 26
    // float strengh = length(vUv);

    // Pattern 27
    // float strengh = distance(vUv , vec2(0.2,0.8));
    // float strengh = distance(vUv , vec2(0.5));

    // Pattern 28
    // float strengh = 1.0 - distance(vUv , vec2(0.5));
    // float strengh = 1.0 - distance(vUv , vec2(0.5)) * 10.0;

    // Pattern 29
    // float strengh = 0.015 / distance(vUv , vec2(0.5));

    // Pattern 30
    // vec2 lightUv = vec2(
    //     vUv.x * 0.1 + 0.45,
    //     vUv.y * 0.5 + 0.25
    // );
    // float strengh = 0.015 / distance(lightUv , vec2(0.5));

    // Pattern 31
    // vec2 lightUvX = vec2(vUv.x * 0.1 + 0.45,vUv.y * 0.5 + 0.25);
    // float lightX = 0.015 / distance(lightUvX , vec2(0.5));
    // vec2 lightUvY = vec2(vUv.y * 0.1 + 0.45,vUv.x * 0.5 + 0.25);
    // float lightY = 0.015 / distance(lightUvY , vec2(0.5));
    // float strengh = lightX * lightY;

    // Pattern 32
    // vec2 rotateUv = rotate(vUv,PI * 0.25,vec2(0.5));
    // vec2 lightUvX = vec2(rotateUv.x * 0.1 + 0.45,rotateUv.y * 0.5 + 0.25);
    // float lightX = 0.015 / distance(lightUvX , vec2(0.5));
    // vec2 lightUvY = vec2(rotateUv.y * 0.1 + 0.45,rotateUv.x * 0.5 + 0.25);
    // float lightY = 0.015 / distance(lightUvY , vec2(0.5));

    // float strengh = lightX * lightY;

    // Pattren 33
    // float strengh = step(0.25,distance(vUv , vec2(0.5)));

    // Pattren 34
    // float strengh = abs(distance(vUv , vec2(0.5)) - 0.25);

    //  Pattren 35 36
    // float strengh = step(0.01, abs(distance(vUv, vec2(0.5)) - 0.25));
    // float strengh = 1.0 - step(0.01,abs(distance(vUv , vec2(0.5)) - 0.25));

    //  Pattren 37
    // vec2 waveUv = vec2(
    //     vUv.x,
    //     vUv.y + sin(vUv.x * 30.0) * 0.1
    // );
    // float strengh = 1.0 - step(0.01, abs(distance(waveUv, vec2(0.5)) - 0.25));

    //  Pattren 38
    // vec2 waveUv = vec2(
    //     vUv.x + sin(vUv.y * 30.0) * 0.1,
    //     vUv.y + sin(vUv.x * 30.0) * 0.1
    // );
    // float strengh = 1.0 - step(0.01, abs(distance(waveUv, vec2(0.5)) - 0.25));

    //  Pattren 39
    // vec2 waveUv = vec2(
    //     vUv.x + sin(vUv.y * 100.0) * 0.1,
    //     vUv.y + sin(vUv.x * 100.0) * 0.1
    // );
    // float strengh = 1.0 - step(0.01, abs(distance(waveUv, vec2(0.5)) - 0.25));

    //  Pattren 40
    // float angle = atan(vUv.x,vUv.y);
    // float strengh = angle;

    //  Pattren 41
    // float angle = atan(vUv.x - 0.5,vUv.y - 0.5);
    // float strengh = angle;

    //  Pattren 42
    // float angle = atan(vUv.x - 0.5,vUv.y - 0.5);
    // angle /= PI * 2.0;
    // angle += 0.5 ;
    // float strengh = angle;

    //  Pattren 43
    // float angle = atan(vUv.x - 0.5,vUv.y - 0.5);
    // angle /= PI * 2.0;
    // angle += 0.5 ;
    // angle *= 20.0;
    // angle = mod(angle,1.0);
    // float strengh = angle;

    //  Pattren 44
    // float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
    // angle /= PI * 2.0;
    // angle += 0.5;
    // angle = mod(angle, 1.0);
    // float strengh = sin(angle * 100.0);

    //  Pattren 45
    // float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
    // angle /= PI * 2.0;
    // angle += 0.5;
    // float sinisold = sin(angle * 100.0);

    // float radius = 0.25 + sinisold * 0.02;
    // float strengh = 1.0 - step(0.01, abs(distance(vUv, vec2(0.5)) - radius));

    //  Pattren 49
    strengh = clamp(strengh,0.0,1.0);

    vec3 blackColor = vec3(0.0);
    vec3 uvColor = vec3(vUv,1.0);
    vec3 mixedColor = mix(blackColor,uvColor,strengh);


    gl_FragColor = vec4(mixedColor, 1.0);
}