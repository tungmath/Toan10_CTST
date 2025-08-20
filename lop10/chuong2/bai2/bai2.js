// hàm lấy kích thước của khung chữ nhật bao ngoài một mã svg nào đó
function layKichThuoc(text){
let svgString=`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="100" >
    <defs>
        <g id="kichThuoc">
            ${text}
        </g>
    </defs>
    <use id="tam" href="#kichThuoc" x="0" y="0"/>
</svg>`;

let parser = new DOMParser();
let svgDoc = parser.parseFromString(svgString,`image/svg+xml`);

let svgEle = svgDoc.documentElement;

let temp = document.getElementById('temp');
temp.appendChild(svgEle);

let svgImg = svgEle.getElementById('tam');// lấy thẻ use ra đo kích thước

let box = svgImg.getBBox();
svgEle.remove();

return box;
}

// hàm vẽ số nguyên ra chuỗi svg. kết quả là các thẻ svg mô tả nó.
function veSoNguyenSVG(so){
    let stringSVG = `<text font-size="16" x="0" y="0"> ${so} </text>`;
    return stringSVG;
}

// hàm vẽ phân số ra chuỗi svg, kết quả là các thẻ svg mô tả nó.
function vePhanSoSVG(phanSo){
    let tuSoSVG = `<text font-size="16" x="0" y="0"> ${Math.abs(phanSo.tuso)} </text>`;// vẽ cái tử số dương ra trước để đo kích thước
    let kichThuocTuSo = layKichThuoc(tuSoSVG);// lấy kích thước tử số để vẽ tiếp.
    let mauSoSVG = `<text font-size="16" x="0" y="0"> ${phanSo.mauso} </text>`;// cái mẫu số ra luôn
    let kichThuocMauSo = layKichThuoc(mauSoSVG);// lấy kích thước mẫu số.
    // vẽ ra phân số thôi.
    // tử số thì bình thường:
    let stringSVG = `<text font-size="16" x="0" y="0"> ${Math.abs(phanSo.tuso)} </text>`;
    // xác định mẫu số nằm ở dưới và canh chính giữa với tử số, nên tính toán tọa độ theo kích thước tử mẫu, chừa thêm chỗ vẽ gạch phân số
    stringSVG +=`<text font-size="16" x="${(kichThuocTuSo.width-kichThuocMauSo.width)/2}" y="${ - kichThuocMauSo.y}"> ${phanSo.mauso} </text>`;
    // giờ vẽ thêm cái gạch nữa là xong: nó dài hơn cả tử mẫu:
    stringSVG += `<line x1="${-Math.max(kichThuocTuSo.width,kichThuocMauSo.width)/2+kichThuocTuSo.width/2}" y1="2"`;// điểm đầu
    stringSVG += ` x2="${Math.max(kichThuocTuSo.width,kichThuocMauSo.width)/2+kichThuocTuSo.width/2-4}" y2="2" stroke="black" />`;// đểm cuối
    if (phanSo.tuso < 0){
        stringSVG += `<text font-size="16" x="${-Math.max(kichThuocTuSo.width,kichThuocMauSo.width)/2+kichThuocTuSo.width/2-8}" y="5.5"> - </text>`;
    }
    
    return stringSVG;
}


// hàm vẽ tọa độ ra chuỗi SVG
function veGiaoSVG(phanSo){
    if (phanSo.mauso===1){
        return veSoNguyenSVG(phanSo.tuso);
    } else {
        return vePhanSoSVG(phanSo);
    }
}


let temp = document.getElementById('temp');
let phanso = new Fraction(-1,10);



let newStringSVG = `<defs><g id="thunghiem">${veGiaoSVG(phanso)}</g></defs>  <use href="#thunghiem" x="0" y="0" />`;
newStringSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-100 -100 200 200"> <rect x="-100" y="-100" width="200" height="200" fill="white" />` + newStringSVG + `</svg>`;


temp.innerHTML = newStringSVG;