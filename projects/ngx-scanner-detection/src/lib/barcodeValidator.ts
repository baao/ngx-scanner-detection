/*!
 * Barcoder
 * Copyright (c) 2013 mifitto GmbH <dominik@mifitto.com>
 * MIT Licensed
 */

/**
 * Supported formats
 */

const minValidLength = 6;
const maxValidLength = 18;
const usualValidChars = /^\d+$/;

export const formats = {
  'ean8'   : { validChars : /^\d+$/, validLength : 8 },
  'ean12'  : { validChars : /^\d+$/, validLength : 12 },
  'ean13'  : { validChars : /^\d+$/, validLength : 13 },
  'ean14'  : { validChars : /^\d+$/, validLength : 14 },
  'ean18'  : { validChars : /^\d+$/, validLength : 18 },
  'gtin12' : { validChars : /^\d+$/, validLength : 12 },
  'gtin13' : { validChars : /^\d+$/, validLength : 13 },
  'gtin14' : { validChars : /^\d+$/, validLength : 14 }
};



export const validateGtin = function( value ) {

  const barcode = value.substring( 0, value.length - 1 );
  const checksum = parseInt( value.substring( value.length - 1 ), 10 );
  let calcSum = 0;
  let calcChecksum = 0;

  barcode.split('').map(function( number, index ) {
    number = parseInt( number, 10 );
    if ( value.length % 2 === 0 ) {
      index += 1;
    }
    if ( index % 2 === 0 ) {
      calcSum += number;
    } else {
      calcSum += number * 3;
    }
  });

  calcSum %= 10;
  calcChecksum = (calcSum === 0) ? 0 : (10 - calcSum);

  if ( calcChecksum !== checksum ) {
    return false;
  }

  return true;


};

export class Barcoder {
  format;
  options;

  constructor(format?, options? ) {
    if ( format && !formats[format] ) { throw new Error( '"format" invalid' ); }
    this.format = (format) ? formats[format] : 'autoSelect';
    this.options = (options) ? options : { enableZeroPadding : true };

    if ( !this.options.enableZeroPadding ) {
      this.options.enableZeroPadding = true;
    }

  }

  validate ( barcode ) {

    const self = this;

    if ( self.format === 'autoSelect' ) {

      if ( barcode.length < minValidLength || barcode.length > maxValidLength ) {
        return false;
      }

      let isValidGtin = validateGtin( barcode );
      let paddedBarcode = barcode;
      let successfullyPadded = false;

      if ( !isValidGtin ) {
        let possiblyMissingZeros = maxValidLength - barcode.length;
        while ( possiblyMissingZeros-- ) {
          paddedBarcode = '0' + paddedBarcode;
          if ( validateGtin( paddedBarcode ) ) {
            isValidGtin = true;
            successfullyPadded = true;
            break;
          }
        }
      }

      return {
        possibleType: (barcode.length > 8) ? 'GTIN' + barcode.length : 'EAN8 / padded GTIN',
        isValid: isValidGtin
      };

    }

    const validChars = self.format.validChars;
    const validLength = self.format.validLength;
    const enableZeroPadding = self.options.enableZeroPadding;

    if ( validChars.exec( barcode ) === null ) {
      return false;
    }

    if ( enableZeroPadding && barcode.length < validLength ) {
      let missingZeros = validLength - barcode.length;
      while ( missingZeros-- ) {
        barcode = '0' + barcode;
      }
    } else if ( !enableZeroPadding && barcode.length !== validLength ) {
      return false;
    } else if ( barcode.length > validLength ) {
      return false;
    }

    return validateGtin( barcode );

  }
}


