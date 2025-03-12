document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript Loaded");

    setTimeout(() => {
        let subMenus = document.querySelectorAll(".sub-menu");

        if (subMenus.length === 0) {
            console.warn("No submenus found.");
            return;
        }

        console.log(`Found ${subMenus.length} submenus.`);

        // Hide all submenus except the last opened one (from sessionStorage)
        subMenus.forEach((subMenu, index) => {
            let menuId = `menu-${index}`;
            subMenu.setAttribute("data-id", menuId);

            // Check sessionStorage for previously opened submenu
            let storedOpenSubMenu = sessionStorage.getItem("opened-submenu");
            if (storedOpenSubMenu === menuId) {
                subMenu.style.display = "block"; // Keep open only the stored submenu
            } else {
                subMenu.style.display = "none"; // Hide all others
            }
        });

        // Event listener to toggle submenus on click
        document.querySelectorAll(".main-menu li > a").forEach(menuLink => {
            menuLink.addEventListener("click", function (event) {
                let subMenu = this.nextElementSibling;

                if (subMenu && subMenu.classList.contains("sub-menu")) {
                    event.preventDefault(); // Prevent page jump
                    let menuId = subMenu.getAttribute("data-id");
                    let isCurrentlyVisible = subMenu.style.display === "block";

                    console.log("Clicked on menu:", this.innerText, "Currently open:", isCurrentlyVisible);

                    // Close all submenus before opening the clicked one
                    document.querySelectorAll(".sub-menu").forEach(menu => {
                        menu.style.display = "none";
                    });

                    // Toggle submenu visibility
                    if (!isCurrentlyVisible) {
                        subMenu.style.display = "block";
                        sessionStorage.setItem("opened-submenu", menuId); // Store this as open
                    } else {
                        sessionStorage.removeItem("opened-submenu"); // Remove session if closed
                    }
                }
            });
        });

    }, 500);
});
