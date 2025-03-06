document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ JavaScript loaded and DOM is ready!");

    // Check if we are on the home page or page-id-521
    if (document.body.classList.contains("home") || document.body.classList.contains("page-id-521")) {
        console.log("🏠 On Home or Page 521 – Clearing sessionStorage");
        sessionStorage.clear();
    }

    setTimeout(() => {
        let subMenus = document.querySelectorAll(".sub-menu");
        if (subMenus.length === 0) {
            console.log("⚠️ No submenus found. Check your class names.");
            return;
        }

        // Assign unique IDs to submenus and initially hide them
        subMenus.forEach((subMenu, index) => {
            let menuId = `menu-${index}`;
            subMenu.setAttribute("data-id", menuId);
            subMenu.style.display = "none"; // Initially hide unless stored as open

            // Restore open submenus from sessionStorage
            let storedState = sessionStorage.getItem(menuId);
            if (storedState === "open") {
                subMenu.style.display = "block";
                console.log(`🔄 Restored open submenu: ${menuId}`);
            }
        });

        // Restore clicked link class after reload
        let storedClickedLink = sessionStorage.getItem("clicked-link");
        if (storedClickedLink) {
            let clickedElement = document.querySelector(`[data-id='${storedClickedLink}']`);
            if (clickedElement) {
                clickedElement.previousElementSibling.classList.add("clicked-link");
                console.log(`🔄 Restored clicked link: ${clickedElement.previousElementSibling.innerText}`);
            }
        }

        // Add event listener to toggle submenus on click
        document.querySelectorAll(".main-menu li > a").forEach(menuLink => {
            menuLink.addEventListener("click", function (event) {
                let subMenu = this.nextElementSibling;

                // Remove "clicked-link" class from all links and add it only to the clicked one
                document.querySelectorAll(".main-menu li > a").forEach(link => link.classList.remove("clicked-link"));
                this.classList.add("clicked-link");

                if (subMenu && subMenu.classList.contains("sub-menu")) {
                    event.preventDefault();
                    let menuId = subMenu.getAttribute("data-id");
                    let isCurrentlyVisible = subMenu.style.display === "block";

                    // Store clicked link in sessionStorage
                    sessionStorage.setItem("clicked-link", menuId);

                    // Close all other submenus
                    document.querySelectorAll(".sub-menu").forEach(menu => {
                        if (menu !== subMenu) {
                            menu.style.display = "none";
                            sessionStorage.setItem(menu.getAttribute("data-id"), "closed");
                        }
                    });

                    // Toggle submenu visibility and store state
                    if (isCurrentlyVisible) {
                        subMenu.style.display = "none";
                        sessionStorage.setItem(menuId, "closed");
                        console.log(`❌ Closed submenu ${menuId}`);
                    } else {
                        subMenu.style.display = "block";
                        sessionStorage.setItem(menuId, "open");
                        console.log(`✅ Opened submenu ${menuId}`);
                    }
                }
            });
        });

    }, 500);
});
