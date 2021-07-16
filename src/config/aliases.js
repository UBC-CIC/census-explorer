const aliases = (prefix = `src`) => ({
  "@": `${prefix}`,
  "@components": `${prefix}/components`,
  "@hooks": `${prefix}/hooks`,
  "@icons": `${prefix}/components/atoms/Icons`,
  "@styles": `${prefix}/styles`,
  "@types": `${prefix}/types`,
  "@data": `${prefix}/data`,
});

module.exports = aliases;
