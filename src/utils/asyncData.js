const asyncData = async (promises = []) => {

  const allSettledRes = await Promise.allSettled(promises)

  const res = allSettledRes.map(el => {
    
    const { status } = el
    
    if(status === 'fulfilled') {
      return el.value
    }

    if(status === 'rejected') {
      return []
    }
  })

  return res
}

export default asyncData