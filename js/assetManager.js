var ASSET_MANAGER;

// Asset manager constructor
function AssetManager()
{
	this.successCount = 0;
	this.downloadQueue = [];
	this.cache = {};
}

// Initiate download of all queued items.
AssetManager.prototype.download = function(queue, downloadCallback)
{
	// Pick up the queue of items to download.
	this.downloadQueue = queue;

	// Step through all items in queue
	for (var i = 0; i < this.downloadQueue.length; i++)
	{
		// Get path (URL) to item
		var path = queue[i];
		var img = new Image();
		var dq = this;

		// When image download succeeds, check if it's time for callback.
		img.addEventListener("load", function() {
//			console.info("Success loading " + img.src + ".");
			dq.successCount ++;
			if (dq.isDone()) {
				downloadCallback();
			}
		}, false);

		// Failed to load?  
		img.addEventListener("error", function() {
			that.errorCount += 1;
			console.error("Failed to load image " + img.src + ".");
		}, false);

		// Force image load by setting path
		img.src = path;

		// "Cache" image variable under path name.
		this.cache[path] = img;
	}
}

AssetManager.prototype.isDone = function() {
//	console.info("am I done? " + (this.downloadQueue.length == this.successCount).toString());
	return (this.downloadQueue.length == this.successCount);
}

AssetManager.prototype.getAsset = function(path) {
	return this.cache[path];
}
