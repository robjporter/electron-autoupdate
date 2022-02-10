  154  mkdir .github/workflows
  155  git add .\n
  156  git commit -m "Build script added"
  157  git push -u origin main\n
  158  npm install -D @electron-forge/publisher-github  
  161  git add .\n
  162  git commit -m "Release script added"
  163  git push -u origin main\n
  164  npm version minor
  165  git add .\n
  166  git commit -m "Drafts enabled"
  167  git push -u origin main\n
  168  npm version minor
  169  git push --follow-tags\n
   npm version minor --force
