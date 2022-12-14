const admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("./privi.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = getFirestore();

async function testCrearUno() {
  let res;

  res = await db.collection("usuarios").doc().set({
    nombre: "tamara",
    rol: "tutor@",
    edad: 20,
  });

  return res;
}

/* testCrearUno()
  .then((res) => console.log(res))
  .catch((e) => console.log(e)); */

async function leerTodos() {
  const res = await db.collection("usuarios").get();
  let arrayRes = res.docs.map((item) => {
    return { id: item.id, ...item.data() };
  });

  return arrayRes;
}
/* 
leerTodos()
  .then((res) => console.log(res))
  .catch((e) => console.log(e)); */

async function updateDocument() {
  const refDocMati = db.collection("usuarios").doc("9fpQwF6oCYQrwE1bcYDu");

  const res = await refDocMati.update({ edad: 20 });

  return res;
}
/* 
updateDocument()
  .then((res) => console.log(res))
  .catch((e) => console.log(e)); */

async function deleteDocument() {
  const res = await db
    .collection("usuarios")
    .doc("9fpQwF6oCYQrwE1bcYDu")
    .delete();
  return res;
}

deleteDocument()
  .then((res) => console.log(res))
  .catch((e) => console.log(e));
