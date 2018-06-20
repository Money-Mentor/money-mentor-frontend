export const shuffle = arr => {
  let r = [...arr]
  for (let i = 0; i < r.length; i++) {
    const j = i + Math.floor(Math.random() * (r.length - i))
    const temp = r[i]
    r[i] = r[j]
    r[j] = temp
  }
  return r
}