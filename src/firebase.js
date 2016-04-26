export default function firebase(base_url) {
	function download(url) {
	  return new Promise((resolve, reject) => {
	    var req = new XMLHttpRequest()
	    req.open('GET', url)
	    req.onload = () => {
	      if (req.status == 200) {
	        resolve(JSON.parse(req.response))
	      } else {
	        reject(Error(req.statusText))
	      }
	    }
	    req.onerror = () => {
	      reject(Error("Network Error"))
	    }
	    req.send()
	  })
	}

	function downloadAll(urls) {
		return Promise.all(urls.map(download))
	}

	function get(keys) {
		let urls = keys.map(key => base_url + "/" + key + ".json")
		return downloadAll(urls)
	}

	function search(term) {
		let url = `${base_url}.json?orderBy=\"$key\"&limitToFirst=5&startAt=\"${term}\"`
		return download(url).then(xs => Object.keys(xs).map(x => xs[x]))
	}

	return {
    get,
    search
  }
}
