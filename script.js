const app = document.querySelector(".app");
const question = document.querySelector("#question");
const reponse = document.querySelector("#reponse");
const reponseCachee = document.querySelector("#reponseCachee");
const categorieSelect = document.querySelector("#categorieSelect");

const fetchBlague = () => {
  const valeurCategorie = categorieSelect.value;
  fetch(`https://api.blablagues.net/?rub=blagues&cat=${valeurCategorie}`)
    .then((response) => response.json()) //{return response.json()}
    .then((d) => {
      const blague = d.data.content;
      /*{
            "text_head": "Un gendarme fait stopper une automobile :",
            "text": "- Vous n'aviez pas vu le feu rouge ?\n- Si si. C'est vous que je n'avais pas vu !",
            "text_hidden": "",
            "source": null,
            "media": null,
            "embed": null,
            "recommend_align": "justify"}*/
      question.textContent = blague.text_head;
      reponse.textContent = blague.text;
      reponseCachee.textContent = blague.text_hidden;
    });
};

const fetchCategorie = async () => {
  const response = await fetch("https://api.blablagues.net/?list_cat");
  const data = await response.json();
  /* data.blagues = {
     "animaux": {
      "categorie": "Animaux",
      "icone": "&#xf1b0",
      "titre": "Blagues sur les animaux",
      "total": "144",
      "adulte": "8"
    },
    "attrape+nigauds": {
      "categorie": "Attrape nigauds",
      "icone": "&#xf7a3",
      "titre": "Attrape-nigauds et farces en tout genre",
      "total": "62",
      "adulte": "10"
    }...
   */
  const categories = Object.keys(data.blagues); // ["animaux","attrape+nigauds",'blondes", "belges", ...  ]
  //   for (let i = 0; i < categories.length; i++) {
  //     categorieSelect.innerHTML += `<option value="${categories[i]}">${
  //       data.blagues[categories[i]].titre
  //     }</option>`;
  //   }
  categories.map((c) => {
    categorieSelect.innerHTML += `<option value="${c}">${data.blagues[c].titre}</option>`;
  });
};

document.body.addEventListener("click", (e) => {
  //   if (e.target.id !== "categorieSelect") {
  fetchBlague();
  //   }
});

categorieSelect.addEventListener("click", (e) => {
  e.stopPropagation();
});
fetchCategorie();
fetchBlague();