
    export type RemoteKeys = 'service/Service';
    type PackageType<T> = T extends 'service/Service' ? typeof import('service/Service') :any;