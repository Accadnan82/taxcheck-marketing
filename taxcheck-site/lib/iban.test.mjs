import test from 'node:test';
import assert from 'node:assert/strict';
import { isValidAeIban, normalizeIban, formatIban, assertBankIban } from './iban.mjs';

const REGISTRY = 'AE070331234567890123456'; // public IBAN-registry example

test('registry example is valid, with or without spaces and in lower case', () => {
  assert.ok(isValidAeIban(REGISTRY));
  assert.ok(isValidAeIban('AE07 0331 2345 6789 0123 456'));
  assert.ok(isValidAeIban(REGISTRY.toLowerCase()));
});

test('a one-digit change fails the checksum', () => {
  assert.equal(isValidAeIban('AE070331234567890123457'), false);
  assert.equal(isValidAeIban('AE070331234567890123556'), false);
});

test('wrong country, length or characters are rejected', () => {
  assert.equal(isValidAeIban('GB82WEST12345698765432'), false);
  assert.equal(isValidAeIban(REGISTRY + '0'), false);
  assert.equal(isValidAeIban(REGISTRY.slice(0, -1)), false);
  assert.equal(isValidAeIban('AE07033123456789012345X'), false);
  assert.equal(isValidAeIban(''), false);
});

test('formatting groups in fours and normalising strips spaces', () => {
  assert.equal(formatIban(REGISTRY), 'AE07 0331 2345 6789 0123 456');
  assert.equal(normalizeIban(' AE07 0331 '), 'AE070331');
});

test('assertBankIban: empty hides, valid passes, invalid throws a clear message', () => {
  assert.equal(assertBankIban(''), '');
  assert.equal(assertBankIban('   '), '');
  assert.equal(assertBankIban('AE07 0331 2345 6789 0123 456'), REGISTRY);
  assert.throws(() => assertBankIban('AE070331234567890123457'), /not a valid UAE IBAN/);
});
