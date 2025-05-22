// פונקציה שמזהה אם תמונה היא תמונת פרופיל בוואטסאפ
function isProfilePicture(img) {
    // בדיקה לפי src
    if (img.src && img.src.includes('dyn')) return true;
    // בדיקה לפי alt (לרוב מכיל שם משתמש)
    if (img.alt && img.alt.length > 0 && img.alt !== 'QR code') return true;
    // בדיקה לפי מחלקות נפוצות (עשוי להשתנות בגרסאות וואטסאפ)
    if (img.className && (
        img.className.includes('avatar') ||
        img.className.includes('user-image') ||
        img.className.includes('chat-avatar')
    )) return true;
    // בדיקה אם נמצא בתוך div של כותרת צ'אט
    if (img.closest('header, ._2EXPL, ._3RWII, ._1AHcd')) return true;
    return false;
}

// רשימת מחלקות של תמונות פרופיל כפי שסיפקת
const profilePicClasses = [
    'x1n2onr6', 'x1lliihq', 'xh8yej3', 'x5yr21d', 'x6ikm8r', 'x10wlt62',
    'x14yjl9h', 'xudhj91', 'x18nykt9', 'xww2gxu', 'xl1xv1r', 'x115dhu7',
    'x17vty23', 'x1hc1fzr', 'x4u6w88', 'x1g40iwv', '_ao3e'
];

const gifClasses = [
    'x1n2onr6', 'xh8yej3'
];

function isRealProfilePic(img) {
    // בדיקת גודל מינימלי (למשל 40x40)
    if (img.naturalWidth < 40 || img.naturalHeight < 40) return false;
    // אימוג'ים לרוב עם alt קצר או ריק
    if (img.alt && img.alt.length <= 2) return false;
    // אפשר להוסיף בדיקה אם האלמנט נמצא בתוך header או div של צ'אט
    return true;
}

function blockProfilePicturesAndGifs() {
    // חסימת תמונות פרופיל
    profilePicClasses.forEach(cls => {
        const imgs = document.querySelectorAll('img.' + cls);
        imgs.forEach(img => {
            if (isRealProfilePic(img)) {
                img.style.display = 'none';
            } else {
                img.style.display = '';
            }
        });
    });
    // חסימת גיפים
    gifClasses.forEach(cls => {
        const gifs = document.querySelectorAll('img.' + cls);
        gifs.forEach(gif => {
            // אפשר להוסיף בדיקה נוספת אם רוצים להבדיל בין גיף לתמונה
            gif.style.display = 'none';
        });
    });
}

// מאזין לשינויים בדף
const observer = new MutationObserver(() => {
    blockProfilePicturesAndGifs();
});
observer.observe(document.body, { childList: true, subtree: true });

// הרצה ראשונית
blockProfilePicturesAndGifs(); 