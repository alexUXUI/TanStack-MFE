
    export type RemoteKeys = 'product/Product';
    type PackageType<T> = T extends 'product/Product' ? typeof import('product/Product') :any;