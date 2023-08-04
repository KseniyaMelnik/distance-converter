import convertDistance  from './convertDistance';

describe('convertDistance', () => {
  it('should convert distance from meters to feet', () => {
    const result = convertDistance('{"distance": {"unit": "m", "value": 0.5}, "convert_to": "ft"}');
    expect(result).toEqual("{\"unit\":\"ft\",\"value\":1.64}");
  });

  it('should return an error message when JSON input is missing', () => {
    //use ts-ignore to call a function without a passed value
    //@ts-ignore
    const result = convertDistance();
    expect(result).toEqual(
        `Set the values to convert in the correct JSON format: 
      "{ "distance": { "unit": "some_unit", "value": "some_value"}, "convert_to": "some_unit"}"`
    );
  });

  it('should return an error message when JSON input is not a string', () => {
    //use ts-ignore to be able to call a function with invalid passed value
    //@ts-ignore
    const result = convertDistance(5);
    expect(result).toEqual(
        `It is necessary to set both "distance" and "convert_to" in the following format: 
        { 'distance': { 'unit': 'some_unit', 'value': 'some_value' }, 'convert_to': 'some_unit' }`
    );
  });

  it('should return an error message when JSON input is not valid', () => {
    const result = convertDistance('hiiii');
    expect(result).toEqual(
        `Set the values to convert in the correct JSON format: 
      "{ "distance": { "unit": "some_unit", "value": "some_value"}, "convert_to": "some_unit"}"`
    );
  });

  it('should return an error message when "distance" or "convert_to" properties are missing', () => {
    let result = convertDistance('{"distance": {"unit": "m", "value": 0.5}}');
    expect(result).toEqual(
        `It is necessary to set both "distance" and "convert_to" in the following format: 
        { 'distance': { 'unit': 'some_unit', 'value': 'some_value' }, 'convert_to': 'some_unit' }`
    );

    result = convertDistance('{"convert_to": "ft"}');
    expect(result).toEqual(
        `It is necessary to set both "distance" and "convert_to" in the following format: 
        { 'distance': { 'unit': 'some_unit', 'value': 'some_value' }, 'convert_to': 'some_unit' }`
    );
  });

  it('should return an error message when units are not supported', () => {
    const result = convertDistance('{"distance": {"unit": "xyz", "value": 0.5}, "convert_to": "ft"}');
    expect(result).toEqual(
        `
        You can only convert distance for the following units: 
        m,cm,in,ft,mm
        `
    );
  });

  it('should return an error message when "value" is not a number', () => {
    const result = convertDistance('{"distance": {"unit": "m", "value": true}, "convert_to": "cm"}');
    expect(result).toEqual('The value must be a number, not a boolean');
  });

  it('should convert distance from feet to meters', () => {
    const result = convertDistance('{"distance": {"unit": "ft", "value": 32}, "convert_to": "m"}');
    expect(result).toEqual("{\"unit\":\"m\",\"value\":9.75}");
  });

  it('should convert distance from meters to centimeters', () => {
    const result = convertDistance('{"distance": {"unit": "m", "value": 2}, "convert_to": "cm"}');
    expect(result).toEqual("{\"unit\":\"cm\",\"value\":200}");
  });

  it('should convert distance from millimeters to centimeters', () => {
    const result = convertDistance('{"distance": {"unit": "mm", "value": 0.5}, "convert_to": "cm"}');
    expect(result).toEqual("{\"unit\":\"cm\",\"value\":0.05}");
  });

  it('should return an error message when "value" is not a valid number', () => {
    const result = convertDistance('{"distance": {"unit": "m", "value": "25"}, "convert_to": "cm"}');
    expect(result).toEqual('The value must be a number, not a string');
  });

  it('should return an error message when "value" is not an array', () => {
    const result = convertDistance('{"distance": {"unit": "m", "value": [22]}, "convert_to": "cm"}');
    expect(result).toEqual('The value must be a number, not a object');
  });
});
