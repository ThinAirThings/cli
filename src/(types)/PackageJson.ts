

export type PackageJson = {
    name: string;
    version: string;
    description?: string;
    keywords?: string[];
    homepage?: string;
    bugs?: { url: string; email?: string } | string;
    license?: string;
    author?: string | { name: string; email?: string; url?: string };
    contributors?: Array<string | { name: string; email?: string; url?: string }>;
    files?: string[];
    main?: string;
    module?: string;
    browser?: string | { [key: string]: string | false };
    bin?: { [key: string]: string } | string;
    man?: string | string[];
    release?: {
        branches?: string[];
        plugins?: string[];
    }
    directories?: {
        lib?: string;
        bin?: string;
        man?: string;
        doc?: string;
        example?: string;
        test?: string;
    };
    repository?: { type: 'git'; url: string } | string;
    scripts?: { [key: string]: string };
    config?: { [key: string]: any };
    dependencies?: { [key: string]: string };
    devDependencies?: { [key: string]: string };
    peerDependencies?: { [key: string]: string };
    optionalDependencies?: { [key: string]: string };
    bundledDependencies?: string[];
    engines?: { [key: string]: string };
    os?: string[];
    cpu?: string[];
    private?: boolean;
    publishConfig?: {
        registry?: string;
        access?: 'public' | 'restricted';
        tag?: string;
        [key: string]: any;
    };
    workspaces?: string[] | { packages: string[] };
    types?: string;
    typings?: string;
    type?: "module" | "commonjs";
    exports?: any; // This could be a complex object due to its flexible nature in Node.js ESM support
    imports?: { [key: string]: string };
    sideEffects?: boolean | string[];
    funding?: { type: string; url: string } | { type: string; url: string }[];
};
