const aliases = (prefix = `src`) => ({
  "@": `${prefix}`,
  "@components": `${prefix}/components`,
  "@context": `${prefix}/context`,
  "@hooks": `${prefix}/hooks`,
  "@styles": `${prefix}/styles`,
  "@types": `${prefix}/types.ts`,
  "@data": `${prefix}/data`,
  "@utils": `${prefix}/utils`,
  "@constants": `${prefix}/constants`,
  "@l10n": `${prefix}/l10n`,
});

module.exports = aliases;
