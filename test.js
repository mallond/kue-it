

const tada = (message)=>{
  return new Promise((resolve, reject)=>{
     resolve(message)
  })
}

tada('hello motto').then((message)=>{
  console.log(message);
});
