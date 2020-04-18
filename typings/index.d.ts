declare module "*.md";
declare module "*.less";
declare module "*.png";
declare module "*.svg";

declare global {
  interface PromiseConstructor {
    abort?: Function;
  }

  interface NodeModule {
    hot: any;
  }

  interface Window {
    _syncModelStore: Function;
  }
}

export {};
