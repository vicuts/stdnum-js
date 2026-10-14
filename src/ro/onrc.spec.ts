import { validate, format } from './onrc';
import { InvalidComponent } from '../exceptions';

describe('ro/onrc', () => {
  it('format:J52/750/2012', () => {
    const result = format('J52/750/2012');

    expect(result).toEqual('J52/750/2012');
  });

  it('validate:J52/750/2012', () => {
    const result = validate('J52/750/2012');

    expect(result.isValid && result.compact).toEqual('J52/750/2012');
  });

  it('validate:J52/750/03.07.2012', () => {
    const result = validate('J52/750/03.07.2012');

    expect(result.isValid && result.compact).toEqual('J52/750/2012');
  });

  it('validate:X52/750/2012', () => {
    const result = validate('X52/750/2012');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });

  it('format:F5/1055/2013', () => {
    const result = format('F5/1055/2013');

    expect(result).toEqual('F05/1055/2013');
  });

  it.each([
    ['F5/1055/2013', 'F05/1055/2013'],
    ['J5/1243/2016', 'J05/1243/2016'],
    ['J/2/750/2012', 'J02/750/2012'],
    ['J1/384/13.05.2015', 'J01/384/2015'],
  ])('validate:%s', (input: string, compact: string) => {
    const result = validate(input);

    expect(result.isValid && result.compact).toEqual(compact);
  });
});
