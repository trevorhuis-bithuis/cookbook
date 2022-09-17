function main(args) {
    let name = args.name || 'stranger'
    let greeting = 'Hello good' + name + '!'
    console.log(greeting)
    return {"body": greeting}
  }
  