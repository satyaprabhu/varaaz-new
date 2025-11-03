import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

// Configure marked options
marked.setOptions({
  breaks: true,
  gfm: true,
})

export async function getPost(category: string, slug: string) {
  try {
    const filePath = path.join(process.cwd(), 'content', category, `${slug}.md`)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(fileContent)
    const htmlContent = await marked(content)

    return {
      data: { ...data, slug },
      content: htmlContent,
    }
  } catch (error) {
    return null
  }
}

export async function getAllPosts(category: string) {
  const dirPath = path.join(process.cwd(), 'content', category)

  if (!fs.existsSync(dirPath)) {
    return []
  }

  const files = fs.readdirSync(dirPath)

  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith('.md'))
      .map(async (file) => {
        const slug = file.replace('.md', '')
        const filePath = path.join(dirPath, file)
        const fileContent = fs.readFileSync(filePath, 'utf-8')
        const { data, content } = matter(fileContent)
        const htmlContent = await marked(content)

        return {
          data: { ...data, slug },
          content: htmlContent,
        }
      })
  )

  return posts
}
