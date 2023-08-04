import rules from './convertationRules.json';

interface Distance {
    unit: string;
    value: number;
  }
  
  interface ConversionInput {
    distance: Distance;
    convert_to: string;
  }
  
  interface ConversionResult {
    unit: string;
    value: number;
  }
  
 const convertDistance = (jsonToConvert: string): string => {
    const convertationRules = JSON.parse(JSON.stringify(rules))
    try {
      const { distance, convert_to }: ConversionInput = JSON.parse(jsonToConvert);
  
      if (!distance || !convert_to || !distance.hasOwnProperty('unit') || !distance.hasOwnProperty('value')) {
        return `It is necessary to set both "distance" and "convert_to" in the following format: 
        { 'distance': { 'unit': 'some_unit', 'value': 'some_value' }, 'convert_to': 'some_unit' }`;
      }
      if (!convertationRules.hasOwnProperty(distance.unit) || !convertationRules.hasOwnProperty(convert_to)) {
        return `
        You can only convert distance for the following units: 
        ${Object.keys(convertationRules)}
        `;
      }
      if (typeof distance.value !== 'number') {
        return `The value must be a number, not a ${typeof distance.value}`;
      }

      const result: ConversionResult = {
        unit: convert_to,
        value: Number((convertationRules[distance.unit][convert_to] * distance.value).toFixed(2))
      }
  
      return JSON.stringify(result)
    } catch {
      return `Set the values to convert in the correct JSON format: 
      "{ "distance": { "unit": "some_unit", "value": "some_value"}, "convert_to": "some_unit"}"`;
    }
  };

  export default convertDistance