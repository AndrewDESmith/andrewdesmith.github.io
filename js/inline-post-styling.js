function PostLink() {
  document.querySelectorAll(".post-link").forEach((element) => {
    element.style.color = "rgb(21 91 152)"

    element.addEventListener("mouseover", (event) => {
      element.style.color = "rgb(36 136 224)"
    })

    element.addEventListener("mouseout", (event) => {
      element.style.color = "rgb(21 91 152)"
    })
  })
}

PostLink()