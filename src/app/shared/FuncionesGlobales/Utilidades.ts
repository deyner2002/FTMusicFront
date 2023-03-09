
export class Utilidades {

    static parseJwt (token:string) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    };

    static saveDatosStorage(datos:any, key:string){
        localStorage.setItem(key, JSON.stringify(datos));
    }

    static getIdUserFromStorage(key:string)
    {
        let idUser:string = ''
        let json = localStorage.getItem(key);
        if(json)
        {
            let data = JSON.parse(json);
            idUser = data.id;
            return idUser;
        }
        return null;     
    }


  
  static checkRut(rut) {
  
    
    // Obtiene el valor ingresado quitando puntos y guión.
    var valor = this.cleanRut(rut);
  
    // Divide el valor ingresado en dígito verificador y resto del RUT.
    let cuerpo = valor.slice(0, -1);
    let dv = valor.slice(-1).toUpperCase();
  
    // Separa con un Guión el cuerpo del dígito verificador.
    rut = this.formatRut(rut);
  
    // Si no cumple con el mínimo ej. (n.nnn.nnn)
    if (cuerpo.length < 7) {
      return 'Ingresó un RUT muy corto, el RUT debe ser mayor a 7 Dígitos. Ej: 12312312-3';
      
    }
  
    // Calcular Dígito Verificador "Método del Módulo 11"
    let suma = 0;
    let multiplo = 2;
  
    // Para cada dígito del Cuerpo
    for (let i = 1; i <= cuerpo.length; i++) {
      // Obtener su Producto con el Múltiplo Correspondiente
      let index = multiplo * parseFloat(valor.charAt(cuerpo.length - i));
  
      // Sumar al Contador General
      suma = suma + index;
  
      // Consolidar Múltiplo dentro del rango [2,7]
      if (multiplo < 7) {
        multiplo = multiplo + 1;
      } else {
        multiplo = 2;
      }
    }
  
    // Calcular Dígito Verificador en base al Módulo 11
    let dvEsperado = 11 - (suma % 11);
  
    // Casos Especiales (0 y K)
    dv = dv == "K" ? "10" : dv;
    dv = dv == "0" ? "11" : dv;
  
    // Validar que el Cuerpo coincide con su Dígito Verificador
    if (dvEsperado.toString() != dv) {
        return 'El RUT ingresado: ' + rut + ' Es INCORRECTO.';
  
    } else {
      
      return "ok";
    }
  }
  
  static formatRut (rut) {
    rut = this.cleanRut(rut)
  
    var result = rut.slice(-4, -1) + '-' + rut.substr(rut.length - 1)
    for (var i = 4; i < rut.length; i += 3) {
      result = rut.slice(-3 - i, -i) + '.' + result
    }
  
    return result
  }
  
  static cleanRut (rut) {
    return typeof rut === 'string'
      ? rut.replace(/^0+|[^0-9kK]+/g, '').toUpperCase()
      : ''
  }

  static format(input) {

    if (input =="") {
      return;
    }

    var op = true;
    var num = input.replace(/[^0123456789]/g, '');
    
    if (!isNaN(num)) {
        if (num < 0) {
            op = false;
            num = num * -1;
        }
        input.value = this.stringMoneyFormat(num);
    }
    else {
        alert('Solo se permiten numeros');
        input.value = input.value.replace(/[^\d\.]*/g, '');
    }
}

static redondeaAlAlza(x, r) {
  x = x == "" ? 0 : x;
  let xx = Math.trunc(x / r)
  let xd = (x / r) - xx;
  if (xd >= 0.5)
      xx++;

  return (xx * r); 
}



static stringMoneyFormat(value:number) {
  return '$ ' + value.toFixed().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");

}

static formatMoneyToNumber(value) {
  value = value.toString();
  if (value == "")
      value = "0";

  return parseFloat(value.replace(/[^0123456789]/g, ''));
}

}