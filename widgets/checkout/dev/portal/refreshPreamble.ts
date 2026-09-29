import RefreshRuntime from '/@react-refresh';

RefreshRuntime.injectIntoGlobalHook(window);

Object.assign(window, {
  $RefreshReg$: () => {},
  $RefreshSig$: () => (type: unknown) => type,
  __vite_plugin_react_preamble_installed__: true,
});
