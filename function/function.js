function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "password") {
      localStorage.setItem("login", "true");
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome to the dashboard!",
      }).then(() => {
        document.getElementById("loginModal").style.display = "none";
        window.location.reload();
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid username or password!",
      });
    }
  }

  function logout() {
    localStorage.removeItem("login");
    Swal.fire({
      icon: "info",
      title: "Logged Out",
      text: "You have been logged out successfully.",
    }).then(() => {
      window.location.reload();
    });
  }
  document.addEventListener('alpine:init', () => {
        Alpine.data('datatable', () => ({
            data: [
                { nama: 'Alice',instansi:'Universitas Indonesia', status: 'aktif' },
                { nama: 'Bob',instansi:'Universitas Indonesia', status: 'tidak aktif' },
                { nama: 'Charlie',instansi:'Universitas Hasanuddin', status: 'aktif' },
                { nama: 'David',instansi:'Universitas Hasanuddin', status: 'aktif' },
                { nama: 'Eve',instansi:'Universitas Hasanuddin', status: 'tidak aktif' },
            ],
            search: '',
            statusFilter: '',
            currentPage: 1,
            perPage: 10,
            isModalOpen: false,

            get filteredData() {
                return this.data
                    .filter(row => row.nama.toLowerCase().includes(this.search.toLowerCase()))
                    .filter(row => !this.statusFilter || row.status === this.statusFilter);
            },

            get totalPages() {
                return Math.ceil(this.filteredData.length / this.perPage);
            },

            paginatedData() {
                const start = (this.currentPage - 1) * this.perPage;
                return this.filteredData.slice(start, start + this.perPage);
            },

            nextPage() {
                if (this.currentPage < this.totalPages) this.currentPage++;
            },

            prevPage() {
                if (this.currentPage > 1) this.currentPage--;
            },

            openModal() {
                this.isModalOpen = true;
            },

            closeModal() {
                this.isModalOpen = false;
            },

            toggleStatus(row) {
                row.status = row.status === 'aktif' ? 'tidak aktif' : 'aktif';
            }
        }));
    });
  window.onload = () => {
    if (!localStorage.getItem("login")) {
      document.getElementById("loginModal").style.display = "flex";
    }
  };