import { GitHubUser } from "./gitHubUsers.js";

const generateTicketButton = document.querySelector(".btnGerarTicket");
const userImage = document.querySelector(".perfilImg");
const userName = document.querySelector(".userName");
const inputName = document.getElementById("searchImgGitHub");
const alertUser = document.querySelector(".alert");
const sucessMessage = document.querySelector(".sucessMessage");
const confirmed = document.querySelector(".confirmed");
const downloadButton = document.querySelector(".btnDownloadTicket");
const cardticket = document.querySelector('.card-ticket')

generateTicketButton.addEventListener("click", () => {
  const username = inputName.value;
  if (username) {
    GitHubUser.search(username).then((userData) => {
      if (userData.login) {
        userImage.src = `https://github.com/${username}.png`;
        userName.textContent = userData.name;
        sucessMessage.textContent = "TICKET GERADO COM SUCESSO";
        generateTicketButton.classList.add("confirmed");
        confirmed.classList.toggle("confirmed");
        downloadButton.classList.remove("confirmed");
        inputName.classList.add("hidden");

        downloadButton.addEventListener("click", () => {
          html2canvas(cardticket).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = imgData;
            link.download = 'ticket-image.png';
            link.click();
          });
        });
      } else {
        alert("Usuario invalido");
        inputName.value = "";
      }
    })
  }
})
