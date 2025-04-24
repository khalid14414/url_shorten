function copyToClipboard() {
    const input = document.getElementById('shortUrlInput')

    navigator.clipboard.writeText(input.value).then(()=>{
        alert('Copied to Clipborad ')
    }).catch((err)=>{
        console.error('Failed ',err)
    })
    
}