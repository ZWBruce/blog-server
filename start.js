const process = require('shelljs')


console.log('开始构建镜像...')
process.exec('docker build -t my-blog:1.0.0 -f ../myBlog/Dockerfile .')

process.exec("docker rmi $(docker images | grep '<none>')")
try {
  let res = process.exec('docker ps -a | grep my-blog')
  console.log('res: ', res.toString('utf-8'))
  if (res) {
    console.log('停止老容器')
    process.exec('docker stop my-blog')
    console.log('删除老容器')
    process.exec('docker rm my-blog')
  }
} catch (e) {
  console.log('查询容器出错', e)
}

console.log('启动容器...')
process.exec('docker run --name=my-blog -d -p 80:8090 my-blog:1.0.0')
console.log('完成！')