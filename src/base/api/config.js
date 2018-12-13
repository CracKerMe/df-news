const getUserId = () => {
  return (
    +new Date() +
    Math.random()
      .toString(10)
      .substring(2, 6)
  )
}
export const commonParams = {
  uid: getUserId(),
  qid: null,
  position: encodeURI('上海'),
  domain: 'mini',
  idx: 0
}
