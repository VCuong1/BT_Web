// Kiểm tra jQuery đã sẵn sàng
$(function() {
    console.log('jQuery is ready!');

    // Xử lý sự kiện submit form
    $('#register-form').on('submit', function(e) {
        e.preventDefault(); // Ngăn reload trang

        // Xóa các thông báo lỗi cũ
        $('.error').text('');
        $('#fail-message').hide();

        // Lấy giá trị các input
        let fullname = $('#fullname').val().trim();
        let email = $('#email').val().trim();
        let password = $('#password').val();

        let hasError = false;

        // Kiểm tra họ tên
        if (fullname === '') {
            $('#fullname-error').text('Họ tên không được để trống');
            hasError = true;
        }

        // Kiểm tra email đơn giản
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            $('#email-error').text('Email không được để trống');
            hasError = true;
        } else if (!emailRegex.test(email)) {
            $('#email-error').text('Email không hợp lệ');
            hasError = true;
        }

        // Kiểm tra mật khẩu
        if (password.length < 6) {
            $('#password-error').text('Mật khẩu phải từ 6 ký tự trở lên');
            hasError = true;
        }

        if (hasError) {
            return;
        }

        // Nếu hợp lệ, gửi AJAX
        $.ajax({
            url: 'https://jsonplaceholder.typicode.com/posts', // API giả lập
            method: 'POST',
            dataType: 'json',
            data: {
                fullname: fullname,
                email: email,
                password: password
            },
            beforeSend: function() {
                // Có thể thêm hiệu ứng loading ở đây
            },
            success: function(response) {
                // Ẩn form và hiện thông báo thành công với hiệu ứng
                $('#register-form').slideUp(500, function() {
                    $('#success-message').fadeIn();
                });
                // Xóa các thông báo lỗi
                $('.error').text('');
            },
            error: function() {
                $('#fail-message').text('Server bận, vui lòng thử lại sau').fadeIn();
            }
        });
    });

    // Hiệu ứng xem chi tiết
    $('#view-detail-btn').on('click', function() {
        $('#detail-info').slideToggle();
    });
});