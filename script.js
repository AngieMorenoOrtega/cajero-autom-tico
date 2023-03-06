const usuarios = [
  {
    name: "antonio",
    document: "54321",
    pass: "12345",
    type: 1
  },
  {
    name: "ana",
    document: "54322",
    pass: "12346",
    type: 1
  },
  {
    name: "angie",
    document: "14321",
    pass: "22345",
    type: 2
  },
  {
    name: "alicia",
    document: "54311",
    pass: "12355",
    type: 2
  }];

const BalancePorBillete = [
  {
    denominacion: 100000,
    cantidad: 10
  },
  {
    denominacion: 50000,
    cantidad: 10
  },
  {
    denominacion: 20000,
    cantidad: 0
  },
  {
    denominacion: 10000,
    cantidad: 10
  },
  {
    denominacion: 5000,
    cantidad: 10
  }
];

const validacion = () => {
  let validation = true;
  let user = {}
  while (validation) {
    const document = parseInt(prompt("Digite su ID:"));
    const pass = prompt("Digite su contraseña:");

    usuarios.forEach(element => {
      if (element.document == document && element.pass == pass) {
        user = element;
        validation = false;
      }
    });
    if (validation == true) {
      alert("El usuario no existe o la contraseña es incorrecta.");
    };
  };
  return user;
}

const cajero = (BalancePorBillete, usuario) => {
  if (usuario.type == 1) { // Administrador
    let sumaTotalCajero = 0;
    BalancePorBillete.forEach(element => {
      element.cantidad += parseInt(prompt(" Usted es administrador, ingrese la cantidad de billetes de " + element.denominacion + ": "));
      const totalPorDenominacion = element.cantidad * element.denominacion;
      console.log("La suma de billetes de " + element.denominacion + " es " + totalPorDenominacion + ". Y la cantidad de billetes: " + element.cantidad + ".");
      sumaTotalCajero += totalPorDenominacion;
    });
    console.log("La suma total de billetes en el cajero es " + sumaTotalCajero + ".");
     const usuario = validacion();
  } 

  else if (usuario.type == 2) { // Cliente
    let sumaTotalCajero = 0;
    BalancePorBillete.forEach(element => {
      const totalPorDenominacion = element.cantidad * element.denominacion;
      sumaTotalCajero += totalPorDenominacion;

    });

    if (sumaTotalCajero == 0) {
      console.log("Cajero en mantenimiento, vuelva pronto.");
       const usuario = validacion();
    } else if (sumaTotalCajero > 0) {
      let cantidadRetirar = parseInt(prompt("Ingrese la cantidad a retirar: "));
      console.log("La cantidad que el cliente quiere retirar es " + cantidadRetirar + ".");
      if (cantidadRetirar <= sumaTotalCajero) {

        let cantidadEntregar = 0;
        BalancePorBillete.forEach(element => {
          const billetesNecesarios = Math.floor(cantidadRetirar / element.denominacion);
          if (billetesNecesarios <= element.cantidad) {
            if (cantidadRetirar >= element.denominacion * billetesNecesarios) {
              cantidadRetirar -= element.denominacion * billetesNecesarios;
              element.cantidad -= billetesNecesarios;
              cantidadEntregar += element.denominacion * billetesNecesarios;
              console.log("Se entregaron " + billetesNecesarios + " de " + element.denominacion + ".");
            }
          } else if (billetesNecesarios > element.cantidad) {
            if (cantidadRetirar >= element.denominacion * element.cantidad) {
              console.log("Se entregaron " + element.cantidad + " de " + element.denominacion + ".");
              cantidadEntregar += element.denominacion * element.cantidad;
              cantidadRetirar -= element.denominacion * element.cantidad;
              element.cantidad -= element.cantidad;
            }
          }
        })
        console.log("La cantidad que el cajero pudo entregar fue " + cantidadEntregar + " y le falto por entregar " + cantidadRetirar + ".");


        BalancePorBillete.forEach(element => {
          const totalPorDenominacion = element.cantidad * element.denominacion;
          console.log("La suma de billetes de " + element.denominacion + " es " + totalPorDenominacion + ". La cantidad restante de billetes en el cajero es: " + element.cantidad + ".");

        });

      } else if (cantidadRetirar > sumaTotalCajero) {
        console.log("El cajero no cuenta con los fondos suficientes para realizar el retiro.");
      }
    }
  }

  const newUser = prompt("¿Quiere ingresar un nuevo usuario? (sí o no): ");
  return newUser
}
let newUser = "sí";
while (newUser == "sí") {
  const usuario = validacion();
  newUser = cajero(BalancePorBillete, usuario);
}
;