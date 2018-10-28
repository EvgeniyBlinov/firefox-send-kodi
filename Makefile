send2kodi.zip:
	cat ./zip.list |\
		zip -@FS ./$@
