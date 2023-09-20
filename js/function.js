import { elements } from "./helpers.js";

const seats = document.querySelectorAll(".seat:not(.reserved)");

// veri tabanından veri okuma
const getSeatsFromDataBase = () => {
  const dbSelectSeaats = JSON.parse(localStorage.getItem("selectedSeatIndex"));
  const dbSelectedMovie = JSON.parse(localStorage.getItem("selectedMovie"));

  elements.select.selectedIndex = dbSelectedMovie;
  if (dbSelectSeaats !== null && dbSelectSeaats.length > 0) {
    seats.forEach((seat, index) => {
      if (dbSelectSeaats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
};

// veri tabanına kayıt etme
const saveSeatsToDataBase = (index) => {
  localStorage.setItem("selectedSeatIndex", JSON.stringify(index));
  localStorage.setItem(
    "selectedMovie",
    JSON.stringify(elements.select.selectedIndex)
  );
};

getSeatsFromDataBase();
export const priceCalculator = () => {
  // Koltukların sıra numarası tespit işlemeleri
  const seatsArray = [];
  seats.forEach((seat) => {
    seatsArray.push(seat);
  });

  const selectedSeats = elements.container.querySelectorAll(".seat.selected");
  //   console.log(selectedSeats);
  const selectedSeatsArray = [];
  selectedSeats.forEach((seat) => {
    selectedSeatsArray.push(seat);
  });

  //   console.log(selectedSeatsArray);

  let selectedSeatIndex = selectedSeatsArray.map((selectedSeat) => {
    return seatsArray.indexOf(selectedSeat);
  });
  console.log(selectedSeatIndex);

  // Hesaplama İşlemleri

  const moviePrice = parseFloat(elements.select.value);

  if (elements.selectedSeatCount.length) {
    elements.infoText.style.display = "block";
  } else {
    elements.infoText.style.display = "none";
  }

  elements.count.innerText = elements.selectedSeatCount.length;
  // fiyat hesaplama ve html'e gönderme
  elements.amount.innerText =
    moviePrice * parseFloat(elements.selectedSeatCount.length);

  saveSeatsToDataBase(selectedSeatIndex);
};
priceCalculator();
/*
 * 1.Aşama: Tıklanılan koltuğun rengini değiştir ve tekrar tıklanınca tersine çevir.
 * -- Erişilen dive olay dinleyicisi ekle ve fonksiyonu çalıştır.
 * -- Tıklanılan elemanı tespit et.
 * -- Tespit edilen elemanın classından seat varsa onun class listine selected ekle
 * -- Eğer selected class'ı varsa çıkart.(toggle)
 
 * 2.Aşama: Eğer seçili koltuk yok ise info yazısı kalkacak var ise gelecek.
 * -- info yazısına eriş 
 * -- seçili koltuk olup olmadığı kontrol et.
 * -- seçili koltuk var ise display'ini block yap.
 * -- yok ise none yap.

 * 3.Seçili koltuk sayısını ve toplam tutarı bilgi yazısında gösterme
 * -- seçili koltuk sayısını aktarmak için count classlı divi çek.
 * -- bu divin innerText'ine selectedSeatcCount ver.
 * -- film seçme kısmını filmlerin fiyat bilgisi için çek
 * -- toplam sayı için bu değeri çarp
 * -- amount classlı spane ekle


*/

export const handleClick = (e) => {
  const clickedSeat = e.target.parentElement;

  //! tıklanılan element seat classı içeriyorsa ve reserved classı içermiyorsa bu yapı çalışır
  if (
    clickedSeat.classList.contains("seat") &&
    !clickedSeat.classList.contains("reserved")
  ) {
    clickedSeat.classList.toggle("selected");
    // Koltuk seçimi değiştiğinde elements.selectedSeatCount'u güncelle.
    elements.selectedSeatCount = document.querySelectorAll(".seat.selected");
    elements.infoText.style.display = "block";
  }
  priceCalculator();
};

export const moviePrice = () => {};
