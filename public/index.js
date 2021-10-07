const socket = io();

socket.on("mensage_back", (data) => {
  console.log(data);
  render(data);
  socket.emit("message_client", "Gracias por la conexion soy el cliente");
});

const render = (data) => {
  let html = data.map((x) => {
    return ` 
        <p> <strong>${x.nombre}</strong> : ${x.msn} </p>
    `;
  }).join(" ");

  document.querySelector("#caja").innerHTML = html;
};

const addInfo = () => {
  let dataObj = {
    nombre: document.querySelector("#nb").value,
    msn: document.querySelector("#msn").value,
  };

  socket.emit("dataMsn", dataObj);
  document.querySelector("#msn").value = "";
  return false;
};
