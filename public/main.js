var alertLoading = '<div class="alert alert-info" role="alert">Loading...</div>';
var alertDone = '<div class="alert alert-success" role="alert">Done!</div>';
var alertFail = '<div class="alert alert-danger" role="alert">Failed...</div>';
var tableHeader = '<tr><th>No.</th><th>Artist</th><th>Album</th><th>Date</th></tr>';

$('document').ready(function() {
	$('form').submit(function(event) {
		event.preventDefault();
	});

	$('#artist').change(function() {
		getAlbums($('#artist').val());
	});
});

function getAlbums(artist) {
	var metadataGet = {
		artist: artist,
		metadata: true,
		wrapper: false
	};

	$.get('/api/spotify', metadataGet).done(function(data) {
		$('#resultmetadatadiv> .alert').remove();
		$('#resultmetadatadiv').append(alertDone);
		var albums = [];

		for (var i = 0; i < data.length; i++) {
			var album = {
				artist: data[i]['album']['artist'],
				album: data[i]['album']['name'],
				date: data[i]['album']['released']
			}
			albums.push(album);
		}
		$('#resultmetadata').empty();
		$('#resultmetadata').append(tableHeader);
		for (var i = 0; i < albums.length; i++) {
			var row = "<tr><td>";
			row += (i + 1) + "</td><td>";
			row += albums[i]['artist'] + "</td><td>";
			row += albums[i]['album'] + "</td><td>";
			row += albums[i]['date'] + "</td></tr>";
			$('#resultmetadata').append(row);
		}

	}).fail(function() {
		$('#resultmetadatadiv> .alert').remove();
		$('#resultmetadatadiv').append(alertFail);
	});

	var webWrapperGet = {
		artist: artist,
		metadata: false,
		wrapper: true
	};

	$.get('/api/spotify', webWrapperGet).done(function(data) {
		$('#resultwebwrapperdiv> .alert').remove();
		$('#resultwebwrapperdiv').append(alertDone);
		var albums = [];

		for (var i = 0; i < data.length; i++) {
			var album = {
				artist: data[i]['artists'][0]['name'],
				album: data[i]['name'],
				date: data[i]['release_date']
			}
			albums.push(album);
		}

		$('#resultwebwrapper').empty();
		$('#resultwebwrapper').append(tableHeader);
		for (var i = 0; i < albums.length; i++) {
			var row = "<tr><td>";
			row += (i + 1) + "</td><td>";
			row += albums[i]['artist'] + "</td><td>";
			row += albums[i]['album'] + "</td><td>";
			row += albums[i]['date'] + "</td></tr>";
			$('#resultwebwrapper').append(row);
		}
	}).fail(function() {
		$('#resultwebwrapperdiv > .alert').remove();
		$('#resultwebwrapperdiv').append(alertFail);
	});

	var webGet = {
		artist: artist,
		metadata: false,
		wrapper: false
	};

	$.get('/api/spotify', webGet).done(function(data) {
		$('#resultwebnowrapperdiv > .alert').remove();
		$('#resultwebnowrapperdiv').append(alertDone);
		var albums = [];

		for (var i = 0; i < data.length; i++) {
			var album = {
				artist: data[i]['artists'][0]['name'],
				album: data[i]['name'],
				date: data[i]['release_date']
			}
			albums.push(album);
		}

		$('#resultwebnowrapper').empty();
		$('#resultwebnowrapper').append(tableHeader);
		for (var i = 0; i < albums.length; i++) {
			var row = "<tr><td>";
			row += (i + 1) + "</td><td>";
			row += albums[i]['artist'] + "</td><td>";
			row += albums[i]['album'] + "</td><td>";
			row += albums[i]['date'] + "</td></tr>";
			$('#resultwebnowrapper').append(row);
		}
	}).fail(function() {
		$('#resultwebnowrapperdiv > .alert').remove();
		$('#resultwebnowrapperdiv').append(alertFail);
	});

	$('.alert-attach > .alert').remove();
	$('.alert-attach').append(alertLoading);
}