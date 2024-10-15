import React from 'react';

const employeeData = [
    {
        "first_name": "Nguyen",
        "middle_name": "Cong",
        "last_name": "Manh",
        "gender": "male",
        "cin": "0522358421",
        "nationality": "Viet Nam",
        "por": "Xom 3 Phu Nong, Hoai Son, Thi xa Hoai Nhon, Binh Dinh",
        "poo": "Phu Nong, Hoai Son, Thi xa Hoai Nhon, Binh Dinh",
        "role_name": "admin",
        "phone": "0977683533",
        "password": "123456789",
        "category": "fulltime",
        "email": "nguyenmanh180102@gmail.com"
    },
    {
        "first_name": "Nguyen",
        "middle_name": "Van",
        "last_name": "An",
        "gender": "male",
        "cin": "0522358422",
        "nationality": "Viet Nam",
        "por": "123 Le Loi, Ben Thanh, Quan 1, TP HCM",
        "poo": "456 Hai Ba Trung, Tan Binh, TP HCM",
        "role_name": "staff",
        "phone": "0905123456",
        "password": "abcdef123",
        "category": "fulltime",
        "email": "nguyenvana@example.com"
    },
    {
        "first_name": "Tran",
        "middle_name": "Thi",
        "last_name": "Binh",
        "gender": "female",
        "cin": "0522358423",
        "nationality": "Viet Nam",
        "por": "789 Nguyen Hue, Phu Nhuan, TP HCM",
        "poo": "321 Tran Hung Dao, Quan 5, TP HCM",
        "role_name": "staff",
        "phone": "0905234567",
        "password": "1234abcd",
        "category": "parttime",
        "email": "tranthib@example.com"
    },
    {
        "first_name": "Le",
        "middle_name": "Thi",
        "last_name": "Luu",
        "gender": "female",
        "cin": "0522358424",
        "nationality": "Viet Nam",
        "por": "123 Bach Dang, Binh Thanh, TP HCM",
        "poo": "456 Ly Thuong Kiet, Tan Binh, TP HCM",
        "role_name": "staff",
        "phone": "0905345678",
        "password": "abcd1234",
        "category": "fulltime",
        "email": "lethic@example.com"
    },
    {
        "first_name": "Pham",
        "middle_name": "Minh",
        "last_name": "Duan",
        "gender": "male",
        "cin": "0522358425",
        "nationality": "Viet Nam",
        "por": "123 Phan Chu Trinh, Quan 3, TP HCM",
        "poo": "456 Pasteur, Quan 1, TP HCM",
        "role_name": "staff",
        "phone": "0905456789",
        "password": "1234efgh",
        "category": "fulltime",
        "email": "phamminhd@example.com"
    },
    {
        "first_name": "Vu",
        "middle_name": "Ngoc",
        "last_name": "Em",
        "gender": "female",
        "cin": "0522358426",
        "nationality": "Viet Nam",
        "por": "123 Hoang Van Thu, Phu Nhuan, TP HCM",
        "poo": "456 Cong Hoa, Tan Binh, TP HCM",
        "role_name": "staff",
        "phone": "0905567890",
        "password": "efgh1234",
        "category": "parttime",
        "email": "vungoce@example.com"
    },
    {
        "first_name": "Dang",
        "middle_name": "Ngoc",
        "last_name": "Quan",
        "gender": "male",
        "cin": "0522358427",
        "nationality": "Viet Nam",
        "por": "123 Phan Dang Luu, Binh Thanh, TP HCM",
        "poo": "456 Nguyen Dinh Chieu, Quan 3, TP HCM",
        "role_name": "staff",
        "phone": "0905678901",
        "password": "5678abcd",
        "category": "fulltime",
        "email": "dangngocf@example.com"
    },
    {
        "first_name": "Hoang",
        "middle_name": "Thi Cam",
        "last_name": "Giang",
        "gender": "female",
        "cin": "0522358428",
        "nationality": "Viet Nam",
        "por": "123 Nguyen Trai, Quan 5, TP HCM",
        "poo": "456 Le Van Sy, Quan 3, TP HCM",
        "role_name": "staff",
        "phone": "0905789012",
        "password": "abcd5678",
        "category": "parttime",
        "email": "hoangthig@example.com"
    },
    {
        "first_name": "Nguyen",
        "middle_name": "Minh",
        "last_name": "Ha",
        "gender": "male",
        "cin": "0522358429",
        "nationality": "Viet Nam",
        "por": "123 Le Van Luong, Quan 7, TP HCM",
        "poo": "456 Cach Mang Thang 8, Quan 10, TP HCM",
        "role_name": "staff",
        "phone": "0905890123",
        "password": "efgh5678",
        "category": "fulltime",
        "email": "nguyenminhh@example.com"
    },
    {
        "first_name": "Tran",
        "middle_name": "Ngoc",
        "last_name": "Yen",
        "gender": "female",
        "cin": "0522358430",
        "nationality": "Viet Nam",
        "por": "123 Vo Van Tan, Quan 3, TP HCM",
        "poo": "456 Tran Quoc Thao, Quan 3, TP HCM",
        "role_name": "staff",
        "phone": "0906901234",
        "password": "5678efgh",
        "category": "parttime",
        "email": "tranngoci@example.com"
    },
    {
        "first_name": "Nguyen Le",
        "middle_name": "Le Van",
        "last_name": "Anh",
        "gender": "male",
        "cin": "0522358431",
        "nationality": "Viet Nam",
        "por": "123 Dinh Tien Hoang, Binh Thanh, TP HCM",
        "poo": "456 Vo Thi Sau, Quan 3, TP HCM",
        "role_name": "staff",
        "phone": "0907012345",
        "password": "abcd7890",
        "category": "fulltime",
        "email": "levanj@example.com"
    },
    {
        "first_name": "Tran",
        "middle_name": "Thi",
        "last_name": "Hoa",
        "gender": "female",
        "cin": "0258743910",
        "nationality": "Viet Nam",
        "por": "789 Nguyen Hue, District 3, Ho Chi Minh City",
        "poo": "456 Le Thanh Ton, District 1, Ho Chi Minh City",
        "role_name": "staff",
        "phone": "0909876543",
        "password": "123456abc",
        "category": "fulltime",
        "email": "tranthihoa@example.com"
    },
    {
        "first_name": "Pham",
        "middle_name": "Van",
        "last_name": "Hai",
        "gender": "male",
        "cin": "0369852147",
        "nationality": "Viet Nam",
        "por": "456 Le Van Sy, District 3, Ho Chi Minh City",
        "poo": "123 Nguyen Dinh Chieu, District 1, Ho Chi Minh City",
        "role_name": "staff",
        "phone": "0912345678",
        "password": "abcdef789",
        "category": "parttime",
        "email": "phamvanhai@example.com"
    },
    {
        "first_name": "Le",
        "middle_name": "Thi",
        "last_name": "My",
        "gender": "female",
        "cin": "0741852369",
        "nationality": "Viet Nam",
        "por": "147 Nguyen Van Troi, Phu Nhuan District, Ho Chi Minh City",
        "poo": "258 Vo Van Tan, District 3, Ho Chi Minh City",
        "role_name": "staff",
        "phone": "0987654321",
        "password": "xyz987654",
        "category": "fulltime",
        "email": "lethimy@example.com"
    },
    {
        "first_name": "Vo",
        "middle_name": "Van",
        "last_name": "Nam",
        "gender": "male",
        "cin": "0687421593",
        "nationality": "Viet Nam",
        "por": "369 Le Lai, District 1, Ho Chi Minh City",
        "poo": "456 Nguyen Thi Minh Khai, District 3, Ho Chi Minh City",
        "role_name": "staff",
        "phone": "0901234567",
        "password": "789abcxyz",
        "category": "fulltime",
        "email": "vovannam@example.com"
    },
    {
        "first_name": "Nguyen",
        "middle_name": "Thi",
        "last_name": "Thu",
        "gender": "female",
        "cin": "0987654321",
        "nationality": "Viet Nam",
        "por": "123 Tran Hung Dao, District 5, Ho Chi Minh City",
        "poo": "456 Nguyen Hue, District 1, Ho Chi Minh City",
        "role_name": "staff",
        "phone": "0976543210",
        "password": "ghi987654",
        "category": "parttime",
        "email": "nguyenthithu@example.com"
    },
    {
        "first_name": "Tran",
        "middle_name": "Van",
        "last_name": "Hieu",
        "gender": "male",
        "cin": "0123456789",
        "nationality": "Viet Nam",
        "por": "369 Vo Van Tan, District 3, Ho Chi Minh City",
        "poo": "789 Le Van Sy, District 2, Ho Chi Minh City",
        "role_name": "staff",
        "phone": "0905123456",
        "password": "123def456",
        "category": "fulltime",
        "email": "tranvanhieu@example.com"
    },
    {
        "first_name": "Pham",
        "middle_name": "Van",
        "last_name": "Tuan",
        "gender": "male",
        "cin": "0478963210",
        "nationality": "Viet Nam",
        "por": "456 Nguyen Van Troi, Phu Nhuan District, Ho Chi Minh City",
        "poo": "789 Le Thanh Ton, District 1, Ho Chi Minh City",
        "role_name": "staff",
        "phone": "0912345678",
        "password": "abc456def",
        "category": "parttime",
        "email": "phamvantuan@example.com"
    },
    {
        "first_name": "Hoang",
        "middle_name": "Thi",
        "last_name": "Kim",
        "gender": "female",
        "cin": "0654321897",
        "nationality": "Viet Nam",
        "por": "123 Le Van Sy, District 3, Ho Chi Minh City",
        "poo": "456 Vo Van Tan, District 1, Ho Chi Minh City",
        "role_name": "staff",
        "phone": "0909876543",
        "password": "def123ghi",
        "category": "fulltime",
        "email": "hoangthikim@example.com"
    },
    {
        "first_name": "Nguyen",
        "middle_name": "Van",
        "last_name": "Quang",
        "gender": "male",
        "cin": "0369875412",
        "nationality": "Viet Nam",
        "por": "789 Le Loi, District 1, Ho Chi Minh City",
        "poo": "123 Nguyen Hue, District 1, Ho Chi Minh City",
        "role_name": "staff",
        "phone": "0905123456",
        "password": "xyz123abc",
        "category": "fulltime",
        "email": "nguyenvanquang@example.com"
    },
    {
        "first_name": "Tran",
        "middle_name": "Thi",
        "last_name": "Nhung",
        "gender": "female",
        "cin": "0547896321",
        "nationality": "Viet Nam",
        "por": "456 Le Lai, District 1, Ho Chi Minh City",
        "poo": "789 Vo Van Tan, District 3, Ho Chi Minh City",
        "role_name": "staff",
        "phone": "0901234567",
        "password": "ghi123def",
        "category": "fulltime",
        "email": "tranthinhung@example.com"
    }
];

const UserUploader = () => {
    const registerEmployee = async (employee) => {
        try {
            const response = await fetch('http://localhost:8080/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(employee)
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();
            console.log(`Employee ${employee.first_name} ${employee.last_name} registered successfully`, data);
        } catch (error) {
            console.error(`Error registering employee ${employee.first_name} ${employee.last_name}`, error);
        }
    };

    const handleRegisterClick = () => {
        employeeData.forEach(registerEmployee);
    };

    return (
        <div>
            <button onClick={handleRegisterClick}>Register Employees</button>
        </div>
    );
};

export default UserUploader;
