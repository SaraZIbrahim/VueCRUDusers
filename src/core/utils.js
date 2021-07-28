/**
 * Set localStorage
 */
export const setLocalStorage = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  return window.localStorage.setItem(name, content)
}
/**
  * Get localStorage
*/
export const getLocalStorage = (name) => {
  if (!name) return
  return JSON.parse(window.localStorage.getItem(name))
}
/**
 * Clear localStorage
*/
export const clearLocalStorage = (name) => {
  if (!name) return
  return window.localStorage.removeItem(name)
}
/**
 * check duplication
*/
export const isThereADuplicate = (list, id) => {
  for (var i = 0; i <= list.length; i++) {
    if (list[i] !== undefined) {
      if (list[i].id === id) {
        return true
      } else {
        return false
      }
    }
  }
}
