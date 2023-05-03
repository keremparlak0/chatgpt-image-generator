const API_KEY = "SECRET-API-KEY";
const submitIcon = document.querySelector("#submit-icon");
const inputElement = document.querySelector("input");
const imageSection = document.querySelector(".images-section")

const getImages = async () => {
    console.log(inputElement.value);
  try {
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "prompt": inputElement.value,
            "n": 2,
            "size": "1024x1024"
        })
      }
    );
    const data = await response.json();
    console.log(data);

    data?.data.forEach(imageObject => {
        const ImageContainer = document.createElement('div')
        ImageContainer.classList.add('image-container')
        const imageElement = document.createElement('img')
        imageElement.setAttribute('src', imageObject.url)
        ImageContainer.append(imageElement) 
        imageSection.append(ImageContainer)
    });
  } catch (error) {
    console.log(error);
  }
};

submitIcon.addEventListener("click", getImages);
