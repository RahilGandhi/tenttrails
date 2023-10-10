mapboxgl.accessToken = 'pk.eyJ1IjoicmFoaWxnYW5kaGkiLCJhIjoiY2xuZTV0c2MwMDMxbjJrbWVucTVwendtMSJ9.ou7NbzjjPTMIrOmhsxfPgA';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/outdoors-v12',
  center: campground.geometry.coordinates,
  zoom : 12
});

new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(new mapboxgl.Popup({ offset: 25 })
        .setHTML(
            `<h3>${campground.title}</h3>`
        )
    )
    .addTo(map)