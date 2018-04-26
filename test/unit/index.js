import test from 'ava'
import ttips from '../../src'

test('ttips type should be a object',
  t => t.is(typeof ttips, 'object'))

test('ttips.init should exist and be of type function', t =>
  t.is(typeof ttips.initialize, 'function'))
