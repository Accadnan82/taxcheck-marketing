// UAE IBAN helpers. The bank block on /pricing is built from content/data.json → bank.iban.
// An invalid, non-empty IBAN must never reach production, so the build calls assertBankIban().

export function normalizeIban(s) {
  return String(s ?? '').replace(/\s+/g, '').toUpperCase();
}

// ISO 13616 mod-97: move the first four characters to the end, map A-Z to 10-35, remainder must be 1.
function mod97(iban) {
  const rearranged = iban.slice(4) + iban.slice(0, 4);
  let rem = 0;
  for (const ch of rearranged) {
    const v = ch >= 'A' && ch <= 'Z' ? String(ch.charCodeAt(0) - 55) : ch;
    for (const d of v) rem = (rem * 10 + Number(d)) % 97;
  }
  return rem;
}

export function isValidAeIban(s) {
  const iban = normalizeIban(s);
  return /^AE\d{21}$/.test(iban) && mod97(iban) === 1;
}

export function formatIban(s) {
  return normalizeIban(s).replace(/(.{4})(?=.)/g, '$1 ');
}

// Returns the normalised IBAN, '' when unset (block hidden), and throws when set but invalid.
export function assertBankIban(raw) {
  const iban = normalizeIban(raw);
  if (!iban) return '';
  if (!isValidAeIban(iban)) {
    throw new Error(
      `content/data.json → bank.iban is not a valid UAE IBAN (expected AE + 21 digits, 23 characters, passing the ISO 13616 mod-97 check). ` +
      `Fix the typo or leave the field empty ("") to hide the bank-transfer block. Received ${iban.length} characters.`
    );
  }
  return iban;
}
