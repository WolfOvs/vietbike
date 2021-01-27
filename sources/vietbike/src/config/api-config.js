/* EDNPPOINTS */
let config = {};

export const setEndpoints = configData => {
  const json = JSON.parse(configData);
  const keys = Object.keys(json);
  keys.forEach(key => {
    config[key] = () => json[key];
  });
};

export default config;