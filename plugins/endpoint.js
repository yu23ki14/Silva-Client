export default (context) => {
  context.$req2 = (path, endpoint) => {
    let url
    if (endpoint === 'silva') {
      url = process.env.SILVA_API_URL + path
    } else if (endpoint === 'sca') {
      url = process.env.SCA_API_URL + path
    }
    return url
  }
}
