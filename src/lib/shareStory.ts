import html2canvas from 'html2canvas'

export async function shareStory(elementId = 'story-card-root'): Promise<void> {
  const el = document.getElementById(elementId)
  if (!el) throw new Error('Story card element not found')

  const canvas = await html2canvas(el, {
    useCORS: true,
    allowTaint: false,
    scale: 1,
    width: 1080,
    height: 1920,
    backgroundColor: '#0a0808',
  })

  const blob = await new Promise<Blob>((resolve, reject) =>
    canvas.toBlob(b => b ? resolve(b) : reject(new Error('Canvas toBlob failed')), 'image/png')
  )

  const file = new File([blob], 'my-drink.png', { type: 'image/png' })

  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    await navigator.share({
      files: [file],
      title: "Drunkard's Dilemma",
    })
  } else {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'my-drink.png'
    a.click()
    URL.revokeObjectURL(url)
  }
}
