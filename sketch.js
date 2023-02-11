let inputValue;
let inputValue2;
let apiKey = SECRET_API_KEY;
let input_str;
let input_str2;
let imageUrl;
let AI_text_str;
function setup() {
  let input_v = select("#inputValue");
  let input2_v = select("#inputValue2");
  let button = select("#submitButton");
  let output = select("#output");

  button.mousePressed(function() {
    inputValue = input_v.value();
    inputValue2 = input2_v.value();
    // output.html("You entered: " + inputValue);
    createCanvas(1024, 1100);
  background(0);
  AI_poem_Gen(inputValue,inputValue2);
  });
}
function AI_poem_Gen(inputValue,inputValue2) {
input_str = inputValue;
input_str2 = inputValue2;
  
let text_prompt = "short and funny advice from "+ input_str +" about the topic of " + input_str2 + "  with sarcastic and funny reference to own life";
let text_url = "https://api.openai.com/v1/engines/text-davinci-002/completions";
let settings = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + apiKey
    },
    body: JSON.stringify({
      prompt: text_prompt,
      max_tokens: 128,
      n: 1,
      stop: "",
      temperature: 0.5
    })
  };

  fetch(text_url, settings)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request failed!');
    }, networkError => console.error(networkError.message))
    .then(jsonResponse => {
      let AI_text = jsonResponse.choices[0].text;
      let h = createP(input_str);
      h.style('font-size', '20px');
      h.style('color','white');
      h.position(10, 5);
      let p = createP(AI_text);
      // let plain_text = p.elt.textContent;
      // plain_text = plain_text.split("\n").join("_");
      // plain_text = plain_text.split("__").join(" ");
      // console.log(plain_text);
      p.style('font-size', '16px');
      p.style('color','white');
      p.position(10, 30);
    });
let endpoint = "https://api.openai.com/v1/images/generations";
  let model = "image-alpha-001";
  let prompt = "hyper realistic fantacy art of " + input_str.split(" ").join("_") + " giving you advice about " + input_str2.split(" ").join("_") + " sitting on a chair pointing finger at you with black background ";
  
  let data = {
    "model": model,
    "prompt": prompt,
    "num_images":1
  };

  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify(data)
  };
  
  fetch(endpoint, options)
    .then(response => response.json())
    .then(data => {
      imageUrl = data.data[0].url;
      // console.log(imageUrl);
      if(imageUrl){
        let img = createImg(imageUrl,'The AI art');
        img.position(0,200);
      }
    });  
}

function draw() {}

function doubleClicked() {
  let fs = fullscreen();
  fullscreen(!fs);
}
