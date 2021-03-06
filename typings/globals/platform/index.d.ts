// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/49b1ac6a384fab428e0bad052b47f47ff8306193/platform/index.d.ts
interface PlatformStatic {
    description?: string;
    layout?: string;
    manufacturer?: string;
    name?: string;
    prerelease?: string;
    product?: string;
    ua?: string;
    version?: string;
    os?: PlatformOS;
    parse?(ua: string): PlatformStatic;
    toString?(): string;
}

interface PlatformOS {
    architecture?: number; //platform's docs say this is a string, but their code doesn't agree
    family?: string;
    version?: string;
    toString(): string;
}

declare var platform: PlatformStatic;
